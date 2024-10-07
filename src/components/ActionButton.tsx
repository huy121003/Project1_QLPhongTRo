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
    <div className="gap-2 flex">
      <Button
        icon={<i className="fa-solid fa-pen-to-square text-green-600 text-xl" />}
        onClick={() => onEdit(item)}
      />
      <Button
        icon={<i className="fa-solid fa-trash text-red-600 text-xl"  />}
        onClick={onDelete}
      />
    </div>
  );
};

export default ActionButton;
