
import { FC } from "react";
import { Message } from "@/types";

interface MessageTableProps {
  data: Message[];
}

export const MessageTable: FC<MessageTableProps> = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border border-gray-300 text-left text-sm font-semibold text-gray-700">
              Name
            </th>
            <th className="py-2 px-4 border border-gray-300 text-left text-sm font-semibold text-gray-700">
              Email
            </th>
            <th className="py-2 px-4 border border-gray-300 text-left text-sm font-semibold text-gray-700">
              Subject
            </th>
            <th className="py-2 px-4 border border-gray-300 text-left text-sm font-semibold text-gray-700">
              Message
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((message, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="py-2 px-4 border border-gray-300 text-sm text-gray-600">{message.name}</td>
              <td className="py-2 px-4 border border-gray-300 text-sm text-gray-600">{message.email}</td>
              <td className="py-2 px-4 border border-gray-300 text-sm text-gray-600">{message.subject}</td>
              <td className="py-2 px-4 border border-gray-300 text-sm text-gray-600">{message.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
