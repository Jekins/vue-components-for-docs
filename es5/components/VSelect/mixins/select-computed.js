/**
 * Select computed properties
 *
 * @mixin
 *
 * Computed properties for
 * the v-select component
 */
export default {
  computed: {
    classes: function classes() {
      var classes = {
        'vf-input-group--text-field vf-input-group--select': true,
        'vf-input-group--auto': this.auto,
        'vf-input-group--overflow': this.overflow,
        'vf-input-group--segmented': this.segmented,
        'vf-input-group--editable': this.editable,
        'vf-input-group--autocomplete': this.isAutocomplete,
        'vf-input-group--single-line': this.singleLine || this.isDropdown,
        'vf-input-group--multi-line': this.multiLine,
        'vf-input-group--chips': this.chips,
        'vf-input-group--solo': this.solo,
        'vf-input-group--multiple': this.multiple,
        'vf-input-group--open': this.menuIsVisible
      };

      if (this.hasError) {
        classes['vf-error--text'] = true;
      } else {
        return this.addTextColorClassChecks(classes);
      }

      return classes;
    },
    computedContentClass: function computedContentClass() {
      var children = ['vf-menu__content--select', this.auto ? 'vf-menu__content--auto' : '', this.isDropdown ? 'vf-menu__content--dropdown' : '', this.isAutocomplete ? 'vf-menu__content--autocomplete' : '', this.contentClass || ''];

      return children.join(' ');
    },
    computedItems: function computedItems() {
      return this.filterDuplicates(this.cachedItems.concat(this.items));
    },

    /**
     * The range of the current input text
     *
     * @return {Number}
     */
    currentRange: function currentRange() {
      return this.getText(this.selectedItem || '').length;
    },
    filteredItems: function filteredItems() {
      // If we are not actively filtering
      // Show all available items
      var items = this.isNotFiltering ? this.computedItems : this.filterSearch();

      return !this.auto ? items.slice(0, this.lastItem) : items;
    },
    hideSelections: function hideSelections() {
      return this.isAutocomplete && !this.isMultiple && this.isFocused && !this.chips && !this.$scopedSlots.selection;
    },
    isNotFiltering: function isNotFiltering() {
      return this.isAutocomplete && this.isDirty && this.searchValue === this.getText(this.selectedItem);
    },
    isHidingSelected: function isHidingSelected() {
      return this.hideSelected && this.isAutocomplete && this.isMultiple;
    },
    isAutocomplete: function isAutocomplete() {
      return this.autocomplete || this.editable || this.tags || this.combobox;
    },
    isDirty: function isDirty() {
      return this.selectedItems.length > 0 || this.isAutocomplete && this.searchValue;
    },
    isDropdown: function isDropdown() {
      return this.segmented || this.overflow || this.editable || this.solo;
    },
    isMultiple: function isMultiple() {
      return this.multiple || this.tags;
    },
    isAnyValueAllowed: function isAnyValueAllowed() {
      return this.tags || this.combobox;
    },
    menuIsVisible: function menuIsVisible() {
      return this.menuIsActive && this.computedItems.length > 0 && (!this.isAnyValueAllowed || this.filteredItems.length > 0);
    },
    menuItems: function menuItems() {
      var _this = this;

      return this.isHidingSelected ? this.filteredItems.filter(function (o) {
        return (_this.selectedItems || []).indexOf(o) === -1;
      }) : this.filteredItems;
    },
    nudgeTop: function nudgeTop() {
      var nudgeTop = -18;

      if (this.solo) nudgeTop = 0;else if (this.shouldOffset) {
        nudgeTop += 44;

        nudgeTop += this.hideDetails ? -24 : 0;
        nudgeTop += this.isAutocomplete && !this.isDropdown ? -2 : 0;
      }

      return nudgeTop;
    },

    searchValue: {
      get: function get() {
        return this.lazySearch;
      },
      set: function set(val) {
        var _this2 = this;

        if (!this.isAutocomplete || this.selectedIndex > -1) return;

        this.lazySearch = val;

        clearTimeout(this.searchTimeout);

        this.searchTimeout = setTimeout(function () {
          _this2.$emit('update:searchInput', val);
        }, this.debounceSearch);
      }
    },
    selectedItem: function selectedItem() {
      var _this3 = this;

      if (this.isMultiple) return null;

      return this.selectedItems.find(function (i) {
        return _this3.getValue(i) === _this3.getValue(_this3.inputValue);
      }) || null;
    },
    shouldOffset: function shouldOffset() {
      return this.isAutocomplete || this.isDropdown;
    }
  }
};