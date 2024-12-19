document.addEventListener("DOMContentLoaded", () => {
  const table = document.getElementById("dataTable");
  const tableColorPicker = document.getElementById("tableColorPicker");
  const tableHue = document.getElementById("tableHue");
  const tableSaturation = document.getElementById("tableSaturation");
  const tableLightness = document.getElementById("tableLightness");
  const bgColorPicker = document.getElementById("bgColorPicker");
  const bgHue = document.getElementById("bgHue");
  const bgSaturation = document.getElementById("bgSaturation");
  const bgLightness = document.getElementById("bgLightness");

  function updateTableColor() {
    const h = tableHue.value;
    const s = tableSaturation.value;
    const l = tableLightness.value;
    table.style.backgroundColor = `hsl(${h}, ${s}%, ${l}%)`;
  }

  function updateBackgroundColor() {
    const h = bgHue.value;
    const s = bgSaturation.value;
    const l = bgLightness.value;
    document.body.style.backgroundColor = `hsl(${h}, ${s}%, ${l}%)`;
  }

  tableColorPicker.addEventListener("change", () => {
    const color = tableColorPicker.value;
    const hsl = hexToHsl(color);
    tableHue.value = hsl.h;
    tableSaturation.value = hsl.s;
    tableLightness.value = hsl.l;
    updateTableColor();
  });

  bgColorPicker.addEventListener("change", () => {
    const color = bgColorPicker.value;
    const hsl = hexToHsl(color);
    bgHue.value = hsl.h;
    bgSaturation.value = hsl.s;
    bgLightness.value = hsl.l;
    updateBackgroundColor();
  });

  tableHue.addEventListener("input", updateTableColor);
  tableSaturation.addEventListener("input", updateTableColor);
  tableLightness.addEventListener("input", updateTableColor);
  bgHue.addEventListener("input", updateBackgroundColor);
  bgSaturation.addEventListener("input", updateBackgroundColor);
  bgLightness.addEventListener("input", updateBackgroundColor);

  function hexToHsl(hex) {
    hex = hex.replace(/^#/, "");
    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;
    let h = 0;
    let s = 0;
    let l = (max + min) / 2;

    if (delta !== 0) {
      h =
        max === r
          ? (g - b) / delta + (g < b ? 6 : 0)
          : max === g
          ? (b - r) / delta + 2
          : (r - g) / delta + 4;

      h /= 6;
      s = l < 0.5 ? delta / (max + min) : delta / (2 - max - min);
    }

    h = Math.round(h * 360);
    s = Math.round(s * 100);
    l = Math.round(l * 100);

    return { h, s, l };
  }
});
