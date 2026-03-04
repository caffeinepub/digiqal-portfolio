import List "mo:core/List";
import Time "mo:core/Time";

actor {
  type Message = {
    name : Text;
    email : Text;
    content : Text;
    timestamp : Time.Time;
  };

  let messages = List.empty<Message>();

  public shared ({ caller }) func submitMessage(name : Text, email : Text, content : Text) : async () {
    let message : Message = {
      name;
      email;
      content;
      timestamp = Time.now();
    };
    messages.add(message);
  };

  public query ({ caller }) func getAllMessages() : async [Message] {
    messages.toArray();
  };
};
