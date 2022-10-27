<template>
  <div class="popping-menus">
    <div class="popping-menu">
      <input class="checkbox" id="checkbox" type="checkbox" />
      <button>手机</button>
      <button>设置</button>
      <button>房子</button>
      <button>车马</button>
      <button>钱</button>
      <label class="label" for="checkbox">Click Me</label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Animation',
}
</script>

<style lang="scss">
@function fact($number) {
  $value: 1;
  @if $number>0 {
    @for $i from 1 through $number {
      $value: $value * $i;
    }
  }
  @return $value;
}

@function pow($number, $exp) {
  $value: 1;
  @if $exp>0 {
    @for $i from 1 through $exp {
      $value: $value * $number;
    }
  } @else if $exp < 0 {
    @for $i from 1 through -$exp {
      $value: $value / $number;
    }
  }
  @return $value;
}

@function rad($angle) {
  $unit: unit($angle);
  $unitless: $angle / ($angle * 0 + 1);
  @if $unit==deg {
    $unitless: $unitless / 180 * pi();
  }
  @return $unitless;
}

@function pi() {
  @return 3.14159265359;
}

@function sin($angle) {
  $sin: 0;
  $angle: rad($angle);
  // Iterate a bunch of times.
  @for $i from 0 through 10 {
    $sin: $sin + pow(-1, $i) * pow($angle, (2 * $i + 1)) / fact(2 * $i + 1);
  }
  @return $sin;
}

@function cos($angle) {
  $cos: 0;
  $angle: rad($angle);
  // Iterate a bunch of times.
  @for $i from 0 through 10 {
    $cos: $cos + pow(-1, $i) * pow($angle, 2 * $i) / fact(2 * $i);
  }
  @return $cos;
}

@function tan($angle) {
  @return sin($angle) / cos($angle);
}
.popping-menus {
  display: flex;
  justify-content: center;
  padding: 100px;
  // 此处要sass
  $d: 9em;
  *,
  ::before,
  ::after {
    padding: 0;
    margin: 0;
  }
  .popping-menu {
    position: relative;
    width: 10em;
    height: 10em;
    display: flex;
    justify-content: center;
    align-items: center;
    button {
      position: absolute;
      display: block;
      width: 4em;
      height: 4em;
      padding: 0 1em;
      appearance: none;
      background: #ffb66f;
      border: none;
      transition: all 0.3s ease-in-out;
      transform: translate(0, 0) rotate(360deg);
      opacity: 0;
      border-radius: 50%;
      color: white;
    }
  }
  .popping-menu {
    .checkbox {
      display: none;
    }
    .checkbox:checked {
      ~ button {
        $per: 180 / 4;
        @for $i from 1 through 6 {
          &:nth-of-type(#{$i}) {
            $angle: $per * ($i - 1) * 1deg + 180deg;
            $x: cos($angle) * $d;
            $y: sin($angle) * $d;
            opacity: 1;
            transition-delay: 0.1s * $i;
            transform: translate($x, $y) rotate(0deg);
          }
        }
      }
    }
  }

  .popping-menu {
    .label {
      z-index: 10;
      border-radius: 50%;
      background: #4791ff;
      width: 6em;
      height: 6em;
      line-height: 6em;
      text-align: center;
      display: block;
      color: white;
      cursor: pointer;
      user-select: none;
    }
  }
}
</style>
