import YearButton from './YearButton';

export default {
  props: {
    maxDate: Date,
    minDate: Date,
    selectedDate: Date
  },
  computed: {
    years () {
      const minYear = this.minDate.getFullYear();
      const maxYear = this.maxDate.getFullYear();
      const years = [];
      for (let year = minYear; year <= maxYear; year++) {
        years.push(year);
      }
      return years;
    }
  },
  methods: {
    scrollToSelectedYear (yearButtonNode) {
      const container = this.$refs.container;
      const containerHeight = container.clientHeight;
      const yearButtonNodeHeight = yearButtonNode.clientHeight || 32;
      const scrollYOffset = (yearButtonNode.offsetTop + yearButtonNodeHeight / 2) - containerHeight / 2;
      container.scrollTop = scrollYOffset;
    },
    createYearButtons (h) {
      return this.years.map((year) => {
        return h(YearButton, {
          props: {
            year,
            selected: year === this.selectedDate.getFullYear()
          },
          on: {
            click: (e) => {
              this.$emit('change', year);
            }
          }
        });
      });
    }
  },
  render (h) {
    return h('div', {
      staticClass: 'mu-datepicker-year-container'
    }, [
      h('div', {
        staticClass: 'mu-datepicker-year',
        ref: 'container'
      }, [
        h('div', {
          staticClass: 'mu-datepicker-year-list'
        }, this.createYearButtons(h))
      ])
    ]);
  }
};