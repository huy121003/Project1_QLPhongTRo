// ActionButtons.tsx
import React from "react";
import { Button } from "antd";

interface ActionButtonProps<T> {
  item: T;
  onEdit: (item: T) => void;
  onDelete: () => void;
}

const ActionButton = <T,>({ item, onEdit, onDelete }: ActionButtonProps<T>) => {
  return (
    <>
      <Button
        icon={<i className="fa-solid fa-pen-to-square text-green-600" />}
        onClick={() => onEdit(item)}
      />
      <Button
        icon={<i className="fa-solid fa-trash text-red-600" />}
        onClick={onDelete}
      />
    </>
  );
};

export default ActionButton;
