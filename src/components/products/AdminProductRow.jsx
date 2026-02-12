import Button from "@/components/ui/Button";

export default function ProductRow({ product, onEdit, onDelete }) {
  return (
    <tr className="border-t">
      <td className="p-3">
        <img
          src={product.images?.[0]}
          className="w-12 h-12 object-cover rounded"
        />
      </td>
      <td>{product.name}</td>
      <td>${product.price}</td>
      <td className="space-x-2">
        <Button size="sm" onClick={() => onEdit(product)}>Edit</Button>
        <Button
          size="sm"
          variant="danger"
          onClick={() => onDelete(product.id)}
        >
          Delete
        </Button>
      </td>
    </tr>
  );
}
