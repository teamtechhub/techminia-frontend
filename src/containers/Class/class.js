import Breadcrumbs from "components/Breadcrumbs";
import React from "react";
import { generateCategoryUrl, generateProductUrl } from "utils";

const populateBreadcrumbs = (product) => [
  {
    link: generateCategoryUrl(product.category.id, product.category.name),
    value: product.category.name,
  },
  {
    link: generateProductUrl(product.id, product.name),
    value: product.name,
  },
];

export default function Class() {
  return (
    <div>
      <Breadcrumbs breadcrumbs={populateBreadcrumbs(null)} />
    </div>
  );
}
