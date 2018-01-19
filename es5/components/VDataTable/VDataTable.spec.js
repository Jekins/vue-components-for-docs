var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import Vue from 'vue';
import { test } from '~util/testing';
import { mount } from 'avoriaz';
import VDataTable from './VDataTable';

test('VDataTable.vue', function () {
  function dataTableTestData() {
    return {
      propsData: {
        pagination: {
          descending: false,
          sortBy: 'col1'
        },
        headers: [{ text: 'First Column', value: 'col1', class: 'a-string' }, { text: 'Second Column', value: 'col2', sortable: false }, { text: 'Third Column', value: 'col3', class: ['an', 'array'] }],
        items: [{ other: 1, col1: 'foo', col2: 'a', col3: 1 }, { other: 2, col1: null, col2: 'b', col3: 2 }, { other: 3, col1: undefined, col2: 'c', col3: 3 }]
      }
    };
  }

  function dataTableTestDataFilter() {
    return {
      propsData: {
        headers: [{ text: 'First Column', value: 'first' }, { text: 'Second Column', value: 'second.first' }, { text: 'Third Column', value: 'third.first.second' }],
        items: [{ other: 1, first: 'foo', second: { first: 'bar' }, third: { first: { second: 'baz', third: 'outside' } }, fourth: 'outside' }]
      }
    };
  }

  // TODO: This doesn't actually test anything
  it.skip('should be able to filter null and undefined values', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var data, pagination, wrapper;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            data = dataTableTestData();
            pagination = data.propsData.pagination;
            wrapper = mount(VDataTable, data);


            pagination.descending = true;

            expect(wrapper.vm.$props.pagination.descending).toBe(true);
            expect('Application is missing <v-app> component.').toHaveBeenTipped();

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  })));

  it('should match a snapshot', function () {
    var data = dataTableTestData();
    var wrapper = mount(VDataTable, data);

    expect(wrapper.html()).toMatchSnapshot();
    expect('Application is missing <v-app> component.').toHaveBeenTipped();
  });

  it('should match a snapshot with single rows-per-page-items', function () {
    var data = dataTableTestData();
    data.propsData.rowsPerPageItems = [1];
    var wrapper = mount(VDataTable, data);

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should match display no-data-text when no data', function () {
    var data = dataTableTestData();
    data.propsData.items = [];
    data.propsData.noDataText = 'foo';
    var wrapper = mount(VDataTable, data);

    expect(wrapper.find('tbody td')[0].html()).toMatchSnapshot();
    expect('Application is missing <v-app> component.').toHaveBeenTipped();
  });

  it('should match display no-results-text when no results', function () {
    var data = dataTableTestData();
    data.propsData.noResultsText = 'bar';
    data.propsData.search = "no such item";
    var wrapper = mount(VDataTable, data);

    expect(wrapper.find('tbody td')[0].html()).toMatchSnapshot();
    expect('Application is missing <v-app> component.').toHaveBeenTipped();
  });

  it('should render aria-sort attribute on column headers', _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
    var data, wrapper, headers;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            data = dataTableTestData();
            wrapper = mount(VDataTable, data);
            headers = wrapper.find('thead:first-of-type > tr:first-of-type > th');


            expect(headers.map(function (h) {
              return h.getAttribute('aria-sort');
            })).toEqual(['ascending', 'none', 'none']);

            wrapper.setProps({
              pagination: {
                sortBy: 'col3',
                descending: false
              }
            });

            expect(headers.map(function (h) {
              return h.getAttribute('aria-sort');
            })).toEqual(['none', 'none', 'ascending']);

            expect('Application is missing <v-app> component.').toHaveBeenTipped();

          case 7:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, _this);
  })));

  it('should match not allow a null sort', _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
    var data, wrapper;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            data = {
              propsData: {
                mustSort: true,
                headers: [{ text: 'First Column', value: 'col1' }, { text: 'Second Column', value: 'col2', sortable: false }, { text: 'Third Column', value: 'col3' }],
                items: [{ other: 1, col1: 'foo', col2: 'a', col3: 1 }, { other: 2, col1: null, col2: 'b', col3: 2 }, { other: 3, col1: undefined, col2: 'c', col3: 3 }]
              }
            };
            wrapper = mount(VDataTable, data);


            expect(wrapper.vm.defaultPagination.descending).toBe(false);
            wrapper.vm.sort(0);
            _context3.next = 6;
            return wrapper.vm.$nextTick();

          case 6:
            expect(wrapper.vm.defaultPagination.descending).toBe(false);
            wrapper.vm.sort(0);
            _context3.next = 10;
            return wrapper.vm.$nextTick();

          case 10:
            expect(wrapper.vm.defaultPagination.descending).toBe(true);
            wrapper.vm.sort(0);
            _context3.next = 14;
            return wrapper.vm.$nextTick();

          case 14:
            expect(wrapper.vm.defaultPagination.descending).toBe(false);

            expect('Application is missing <v-app> component.').toHaveBeenTipped();

          case 16:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, _this);
  })));

  it('should render a progress with headers slot', function () {
    var vm = new Vue();
    var wrapper = mount(Vue.component('test', {
      components: {
        VDataTable: VDataTable
      },
      render: function render(h) {
        return h('v-data-table', {
          props: {
            items: []
          },
          scopedSlots: {
            headers: function headers(props) {
              return vm.$createElement('tr');
            }
          }
        });
      }
    }));

    expect(wrapper.find('.datatable__progress').length).toBe(1);
    expect('Application is missing <v-app> component.').toHaveBeenTipped();
  });

  it('should only filter on data specified in headers', _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            wrapper = mount(VDataTable, dataTableTestDataFilter());


            expect(wrapper.instance().filteredItems.length).toBe(1);
            wrapper.setProps({
              search: 'outside'
            });
            expect(wrapper.instance().filteredItems.length).toBe(0);
            wrapper.setProps({
              search: 'baz'
            });
            expect(wrapper.instance().filteredItems.length).toBe(1);

            expect('Application is missing <v-app> component.').toHaveBeenTipped();

          case 7:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, _this);
  })));

  it('should not filter items if search is empty', _asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            wrapper = mount(VDataTable, dataTableTestDataFilter());


            wrapper.setProps({
              search: '    '
            });
            expect(wrapper.instance().filteredItems.length).toBe(1);

            expect('Application is missing <v-app> component.').toHaveBeenTipped();

          case 4:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, _this);
  })));
});