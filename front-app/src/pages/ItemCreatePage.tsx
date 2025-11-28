// src/pages/ItemCreatePage.tsx
import React from "react";
import { useItemCreate } from "hooks/useItemCreate";
import ItemCreateForm from "components/items/ItemCreateForm";

const ItemCreatePage: React.FC = () => {
  const itemCreateProps = useItemCreate();

  return <ItemCreateForm {...itemCreateProps} />;
};

export default ItemCreatePage;
