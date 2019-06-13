// @ts-check
import { extendMoment } from 'moment-range';
import { chunk, debounce } from 'lodash';

import CoreBase from '../core-base';
// @ts-ignore
import htmlTemplate from './core-datepicker.html';
// @ts-ignore
import cssTemplate from './core-datepicker.css';

const moment = extendMoment(require('moment'));

/**
 * A simple datepicker
 * @external
 * @property {function} onchange - Function to run on change date. Must have event argument
 * eg. onDateChange(event) - returns Date object
 * @property {boolean} disabled - Datepicker is disabled. Default is false
 * @property {boolean} clearable - Show clear button. Default is false
 * @property {string} format - date format in input - see {@link https://momentjs.com/docs/#/displaying/}
 * @playground
 * <core-datepicker clearable></core-datepicker>
 */

class CoreDatepicker extends CoreBase {
  static get observedAttributes() {
    return ['disabled', 'clearable', 'format'];
  }

  constructor() {
    super(htmlTemplate, cssTemplate);
    /* Queries */
    this.popup = this.shadowRoot.querySelector('.popup');
    this.input = this.shadowRoot.querySelector('input');
    this.year = this.shadowRoot.querySelector('#year');
    this.month = this.shadowRoot.querySelector('#month');
    this.days = this.shadowRoot.querySelector('#days');
    this.clearBtn = this.shadowRoot.querySelector('#clear-btn');

    /* Control variables */
    this.active = false;
    this.date = moment();
    /** @type {HTMLElement} */ this.selectedDayElement = null;
    this.initialDays = this.days.cloneNode();
    this.disabled = false;
    this.weekdayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => `<th>${d}</th>`);
    this.tableHeaders = `<tr>${this.weekdayLabels.join(' ')}</tr>`;
    this.format = 'DD-MM-YYYY';

    /* Binding */
    this.renderCalendar = this.renderCalendar.bind(this);
    this.onPressDate = this.onPressDate.bind(this);
  }


  /** This function renders the calendar, it must be called whenever there's a
   * this.date moment change to properly reflect the changes in both year and month
   * changes
   */
  renderCalendar() {
    this.days.innerHTML = this.tableHeaders;
    let calendarStartDate = this.date.clone().startOf('month');
    while (calendarStartDate.weekday() !== 0) {
      calendarStartDate = calendarStartDate.subtract(1, 'day');
    }
    const calendarEndDate = calendarStartDate.clone().add(41, 'day');

    const range = moment.range(calendarStartDate, calendarEndDate);
    const weeks = chunk([...range.by('days')], 7);
    weeks.forEach((w) => {
      const tr = document.createElement('tr');
      tr.innerHTML = w.map(d => `<td class='day ${d.isSame(this.date, 'month') ? 'same' : 'other'}'><span>${d.format('DD')}</span></td>`).join(' ');
      this.days.appendChild(tr);
    });

    this.year.innerHTML = this.date.format('YYYY');
    this.month.innerHTML = this.date.format('MMMM');

    Array.from(this.shadowRoot.querySelectorAll('td.same')).forEach((d) => {
      d.addEventListener('click', this.onPressDate, false);
    });
  }

  /** This runs whenever a day is pressed. It will remove the selected class from
  * the previous date, if any, and will trigger a close to the datepicker
  */
  onPressDate(ev) {
    ev.stopPropagation();
    if (ev.currentTarget !== this.selectedDayElement && this.selectedDayElement) {
      this.selectedDayElement.firstElementChild.classList.remove('selected');
    }

    this.selectedDayElement = ev.currentTarget;
    this.selectedDayElement.firstElementChild.classList.add('selected');
    this.date = this.date.startOf('month').add(parseInt(this.selectedDayElement.innerText, 10) - 1, 'day');
    this.input.value = this.date.format(this.format);
    this.dispatchEvent(new CustomEvent('change', {
      detail: this.date.toDate(),
    }));
    // @ts-ignore
    document.children[0].click();
  }

  /** When the component is mounted we'll render it for the first time and also
   * add the event listeners for when the popup should show or hide
   */
  connectedCallback() {
    this.renderCalendar();

    const deboucedAdjustLeft = debounce(() => {
      // @ts-ignore
      this.popup.style.left = this.getBoundingClientRect().left;
    }, 20);

    /** This two lines will make sure the popup stay with the input even if
     * the window changes somehow eg. resize
     */
    deboucedAdjustLeft();
    window.addEventListener('resize', deboucedAdjustLeft);

    this.input.onfocus = () => {
      if (!this.disabled) {
        this.active = true;
        this.popup.setAttribute('active', 'true');
      }
    };

    this.clearBtn.addEventListener('click', () => {
      this.input.value = '';
      this.date = moment();
      if (this.selectedDayElement) {
        this.selectedDayElement.firstElementChild.classList.remove('selected');
      }
    });

    window.addEventListener('click', (ev) => {
      // @ts-ignore
      if (ev.target.localName !== 'core-datepicker' && this.active) {
        this.popup.removeAttribute('active');
        this.active = false;
      }
    });

    /** This will parse the button names to know what moment function to call
     * eg. if button had id=subtract-year, subtract is btn[0] and the unit is btn[1]
     * see moment.js docs for more info.
     */
    this.shadowRoot.querySelectorAll('button').forEach((b) => {
      b.addEventListener('click', (ev) => {
        // @ts-ignore
        const btn = ev.target.id.split('-');
        this.date[btn[0]](1, btn[1]);
        this.renderCalendar();
      });
    });
  }

  attributeChangedCallback(name, oldVal, newVal) {
    switch (name) {
      case 'disabled':
        this.disabled = newVal !== null;
        this.input.disabled = this.disabled;
        break;
      case 'clearable':
        if (newVal !== null) {
          this.clearBtn.classList.add('visible');
        } else {
          this.clearBtn.classList.remove('visible');
        }
        break;
      case 'format':
        if (newVal !== null && typeof newVal === 'string') {
          this.format = newVal;
        }
        break;
      default:
        break;
    }
  }
}

window.customElements.define('core-datepicker', CoreDatepicker);
