"use client";

type Props = {
  row: any;
  onAssignPack: (requestID: string) => void;
};

export default function PackRow({ row, onAssignPack }: Props) {
  return (
    <tr>
      <td>{row.name}</td>
      <td>{row.mobile}</td>
      <td>₦{Number(row.amount).toLocaleString()}</td>
      <td>{row.packNo ?? "-"}</td>
      <td>
        {row.packNo == null ? (
          <button onClick={() => onAssignPack(row.requestID)}>
            Assign Pack
          </button>
        ) : (
          <span>Assigned</span>
        )}
      </td>
    </tr>
  );
}