<template>
  <div class="search_input__search h-full w-full" :class="{ searching: value }">
    <!-- Clear search input button -->
    <div class="search_input__search__clear h-full" :class="{ active: value !== '' }">
      <div class="h-full row row--justify-center row--items-center">
        <ButtonIcon icon="times" title="Clear" size="sm" :onClick="handleClearClick" />
      </div>
    </div>

    <!-- Search input -->
    <input v-model="value"
          ref="search"
          type="search"
          name="search"
          id="search"
          class="search_input__search__input h-full w-full"
          placeholder="Search..."
          @input="handleSearch"
          @keyup.enter="emitUpdate"
          @focus="$emit('focus')"
          @blur="$emit('blur')" />

    <!-- Underline -->
    <div class="search_input__search__underline"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ButtonIcon from '@/components/ui/buttons/ButtonIcon.vue';

@Component({
  components: {
    ButtonIcon,
  },
})
export default class InputSearch extends Vue {
  /** Value */
  @Prop(String) value?: number | null;

  $refs!: {
    search: HTMLInputElement;
  };

  /** Search timeout. */
  timeout: number | null = null;

  /**
   * Emit input update event.
   */
  emitUpdate(evt: any) {
    this.$emit('update:value', evt.target.value);
  }

  /**
   * Handle search input changes.
   */
  handleSearch(evt: any) {
    if (this.timeout !== null) clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      this.emitUpdate(evt);
    }, 300);
  }

  /**
   * Handle clear search.
   */
  handleClearClick() {
    this.$emit('update:value', '');

    // Re-set focus on input.
    this.$refs.search.focus();
  }
}
</script>

<style lang="scss" scoped>
.search_input__search {
  position: relative;

  &__clear {
    display: none;
    opacity: 0;
    pointer-events: none;
    position: absolute;
    right: 0;
    top: 0;
    transition: opacity 0.1s ease-in-out;
    z-index: 1;

    &.active {
      opacity: 1;
      pointer-events: all;
    }
  }

  &__input {
    background: none;
    border: none;
    color: rgb(var(--color-text-bright));
    font-size: 1.4rem;
    padding: 0 2rem;
    text-align: center;
  }

  &__underline {
    background-color: rgb(var(--color-text-bright));
    bottom: 8px;
    height: 2px;
    left: 0;
    margin-left: auto;
    margin-right: auto;
    margin: 0 auto;
    opacity: 0;
    position: absolute;
    right: 0;
    transition: opacity 0.2s ease-in-out, width 0.2s ease-in-out;
    width: 0%;
    z-index: -1;
  }

  &.searching {
    .search_input__search__clear {
      display: block
    }

    .search_input__search__underline {
      opacity: 1;
      width: 100%;
    }
  }
}
</style>
