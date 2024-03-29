import * as d3 from "d3";
import { COLORS, LEGEND_COLORS, ColorMode } from "./colors";
import { ICONS, LIGHTBULB_ICON } from "./icons";
import * as detail_overlay from "./detailed_view";

export function setColorMode(mode: ColorMode): void {
  console.log(`Color mode: ${colorMode}`);
  d3.select("body").style("background-color", COLORS.background[colorMode]);
  d3.select("#car_button > ellipse").attr("fill", COLORS.center_out[colorMode]);
  d3.select("#car_button > g > path").attr("fill", COLORS.center_in[colorMode]);
  d3.select("#network-container > ul").style(
    "background-color",
    colorMode === "dark" ? "rgba(0, 0, 0, 0.6)" : "rgba(200, 200, 200, 0.6)"
  );
  d3.selectAll("circle.particle").attr("fill", (d: any) => {
    return LEGEND_COLORS[d][colorMode];
  });
  d3.select(".color-mode").html(LIGHTBULB_ICON[colorMode]);

  Object.entries(ICONS).forEach(([key, value]) => {
    d3.select(`.${key} .icon`).attr("fill", LEGEND_COLORS[key][colorMode]);

    d3.select(`.${key} .text`).style("color", LEGEND_COLORS[key][colorMode]);
  });
}

export function changeLightMode(): void {
  colorMode = colorMode === "dark" ? "light" : "dark";
  setColorMode(colorMode);
}

export const click_campaign_node = (event: any, node: any): void => {
  detail_overlay.show(node);
};

export const click_link = (event: any, node: any): void => {
  click_campaign_node(event, node);
};

export const click_outside = (event: any, node: any) => {
  console.log("hide detailed view");
  d3.select("#grid").on("click", null);
  d3.select("canvas").style("visibility", "visible");
  detail_overlay.hide();
};
