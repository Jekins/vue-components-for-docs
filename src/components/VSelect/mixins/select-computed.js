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
    classes () {
      const classes = {
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
      }

      if (this.hasError) {
        classes['vf-error--text'] = true
      } else {
        return this.addTextColorClassChecks(classes)
      }

      return classes
    },
    computedContentClass () {
      const children = [
        'vf-menu__content--select',
        this.auto ? 'vf-menu__content--auto' : '',
        this.isDropdown ? 'vf-menu__content--dropdown' : '',
        this.isAutocomplete ? 'vf-menu__content--autocomplete' : '',
        this.contentClass || ''
      ]

      return children.join(' ')
    },
    computedItems () {
      return this.filterDuplicates(this.cachedItems.concat(this.items))
    },
    /**
     * The range of the current input text
     *
     * @return {Number}
     */
    currentRange () {
      return this.getText(this.selectedItem || '').length
    },
    filteredItems () {
      // If we are not actively filtering
      // Show all available items
      const items = this.isNotFiltering
        ? this.computedItems
        : this.filterSearch()

      return !this.auto ? items.slice(0, this.lastItem) : items
    },
    hideSelections () {
      return this.isAutocomplete &&
        !this.isMultiple &&
        this.isFocused &&
        !this.chips &&
        !this.$scopedSlots.selection
    },
    isNotFiltering () {
      return this.isAutocomplete &&
        this.isDirty &&
        this.searchValue === this.getText(this.selectedItem)
    },
    isHidingSelected () {
      return this.hideSelected && this.isAutocomplete && this.isMultiple
    },
    isAutocomplete () {
      return this.autocomplete || this.editable || this.tags || this.combobox
    },
    isDirty () {
      return this.selectedItems.length > 0 ||
        (this.isAutocomplete && this.searchValue)
    },
    isDropdown () {
      return this.segmented || this.overflow || this.editable || this.solo
    },
    isMultiple () {
      return this.multiple || this.tags
    },
    isAnyValueAllowed () {
      return this.tags || this.combobox
    },
    menuIsVisible () {
      return this.menuIsActive &&
        this.computedItems.length > 0 &&
        (!this.isAnyValueAllowed || this.filteredItems.length > 0)
    },
    menuItems () {
      return this.isHidingSelected ? this.filteredItems.filter(o => {
        return (this.selectedItems || []).indexOf(o) === -1
      }) : this.filteredItems
    },
    nudgeTop () {
      let nudgeTop = -18

      if (this.solo) nudgeTop = 0
      else if (this.shouldOffset) {
        nudgeTop += 44

        nudgeTop += this.hideDetails ? -24 : 0
        nudgeTop += this.isAutocomplete && !this.isDropdown ? -2 : 0
      }

      return nudgeTop
    },
    searchValue: {
      get () { return this.lazySearch },
      set (val) {
        if (!this.isAutocomplete ||
          this.selectedIndex > -1
        ) return

        this.lazySearch = val

        clearTimeout(this.searchTimeout)

        this.searchTimeout = setTimeout(() => {
          this.$emit('update:searchInput', val)
        }, this.debounceSearch)
      }
    },
    selectedItem () {
      if (this.isMultiple) return null

      return this.selectedItems.find(i => (
        this.getValue(i) === this.getValue(this.inputValue)
      )) || null
    },
    shouldOffset () {
      return this.isAutocomplete || this.isDropdown
    }
  }
}
