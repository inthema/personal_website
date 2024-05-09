import "lume/types.ts";
import Color from "https://colorjs.io/dist/color.js";
import basePath from "lume/plugins/base_path.ts";
import favicon from "lume/plugins/favicon.ts";
import metas from "lume/plugins/metas.ts";
import postcss from "lume/plugins/postcss.ts";
import transformImages from "lume/plugins/transform_images.ts";
import * as si from "npm:simple-icons@11.9.0";
import type { SimpleIcon } from "npm:simple-icons@11.9.0";

const icons = Object.values(si) as SimpleIcon[];

/** Configure the site */
export default function () {
  return (site: Lume.Site) => {
    site.use(postcss())
      .use(metas())
      .use(favicon())
      .use(basePath())
      .mergeKey("extra_head", "stringArray")
      .use(transformImages());

    site.data("icon", (slug?: string) => {
      if (!slug) return;
      return icons.find((icon) => icon.slug === slug);
    });

    site.data("textColor", (hex: string) => {
      const color = new Color(`#${hex}`);
      const onWhite = Math.abs(color.contrastWCAG21("white"));
      const onBlack = Math.abs(color.contrastWCAG21("black"));
      return (onWhite + 0.5) > onBlack ? "white" : "black";
    });

    site.copy([".jpg", ".webp", ".png"]);
  };
}
