import { MessageTable } from "@/src/components";
import { Message } from "@/types";




const Messages= () => {
  // Sample data
  const messageData: Message[] = [
    { name: "John Doe", email: "john@example.com", subject: "Hello", message: "How are you?" },
    { name: "Jane Smith", email: "jane@example.com", subject: "Inquiry", message: "Need more info." },
  ];

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-xl font-semibold mb-4">Messages</h1>
      <MessageTable data={messageData} />
    </div>
  );
};

export default Messages;
