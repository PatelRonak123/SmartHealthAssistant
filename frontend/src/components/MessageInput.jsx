import { Image, Send, X, Video } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getSocket } from "../lib/socket";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [mediaPreview, setMediaPreview] = useState(null);
  const [media, setMedia] = useState(null);
  const [mediaType, setMediaType] = useState("");
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.chat);

  const handleChange = (e) => {
    const file = e.tatget.files[0];
    if (!file) {
      setMedia(file);
      const type = file.type;
      if (type.startWith("image/")) {
        setMediaType("image");
        const reader = new FileReader();
        reader.onload = () => {
          setMediaPreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else if (type.startWith("video/")) {
        setMediaType("video");
        const videoUrl = URL.createObjectURL(file);
        setMediaPreview(videoUrl);
      } else {
        toast.error("Please select an image or video file.");
        setMedia(null);
        setMediaPreview(null);
        setMediaType("");
        return;
      }
    }
  };

  const removeMedia = () => {
    setMedia(null);
    setMediaPreview(null);
    setMediaType("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !media) return;
    const data = new FormData();
    data.append("text", text.trim());
    data.append("media", media);
    dispatch(sendMessage(data));

    setText("");
    setMedia(null);
    setMediaPreview(null);
    setMediaType("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;
    const handleNewMessage = (newMessage) => {
      if (
        newMessage.senderId === selectedUser._id ||
        newMessage.receiverId === selectedUser._id
      ) {
        dispatch({ type: "chat/pushNewMessage", payload: newMessage });
      }
    };
    socket.on("newMessage", handleNewMessage);
    return () => socket.off("newMessage", handleNewMessage);
  }, [selectedUser._id]);

  return <></>;
};

export default MessageInput;
