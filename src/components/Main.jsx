
import React, { useState, useEffect, useRef } from 'react';
import './Main.css';
import ROBOT from "../assets/AI-Robot.png";  // Ensure this is the correct path to the robot image
import create from '../assets/create.png';
import generate from '../assets/generate.png';
import logo from "../assets/iGeniusDark.png";
import sendlogo from "../assets/send.png";
import voice from "../assets/mic.png";
import upload from "../assets/upload.png";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Import Chevron icons
import Genius from "../assets/Genius.png";
import { FaPlus } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoShareSocialOutline } from "react-icons/io5";
import { FaEdit, FaCopy } from "react-icons/fa"; // Import Edit and Copy icons

function App() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]); // State to manage the list of all chat messages
    const [isChatActive, setIsChatActive] = useState(false); // State to track if chat is active
    const [isExpanded, setIsExpanded] = useState(false);
    const [isMainContentVisible, setIsMainContentVisible] = useState(true);  // To handle visibility of main content
    const chatHistoryRef = useRef(null);

    const expandSidebar = () => {
        setIsExpanded(true);
    };

    const toggleSidebar = () => {
        setIsExpanded((prev) => !prev);
    };

    // Handle message input change
    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    // Generate a random response
    const generateRandomResponse = () => {
        const responses = [
            "Hello! How can I assist you today?",
            "I'm here to help. What do you need?",
            "Let me know how I can assist you.",
            "Feel free to ask me anything.",
            "I'm listening. What's on your mind?"
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    };

    // Handle sending message
    const handleSendMessage = () => {
        if (message.trim()) {
            // Add the new message to the chat history
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: message, sender: 'user', id: Date.now() }
            ]);
            setMessage(''); // Clear the input field

            // Generate a random response and add it to the chat history
            setTimeout(() => {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { text: generateRandomResponse(), sender: 'bot', id: Date.now() + 1 }
                ]);
            }, 1000);

            // Set chat as active
            setIsChatActive(true);
        }
    };

    // Handle "New Chat" Button
    const handleNewChat = () => {
        setIsChatActive(false); // Reset chat to initial state
        setMessages([]); // Clear the chat history
    };

    // Handle Copy Message
    const handleCopyMessage = (text) => {
        navigator.clipboard.writeText(text);
        alert("Copied to clipboard!");
    };

    // Handle Edit Message
    const handleEditMessage = (id) => {
        const messageToEdit = messages.find((msg) => msg.id === id);
        if (messageToEdit) {
            setMessage(messageToEdit.text);
            setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== id));
        }
    };

    // Scroll to the bottom of the chat history when messages change
    useEffect(() => {
        if (chatHistoryRef.current) {
            chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div className="app">
            <div className={`sidebar-container ${isExpanded ? "expanded" : ""}`}>
                {/* Top row with logo & back arrow */}
                <div className="header-row">
                    <div className="logo" onClick={expandSidebar} >
                        <img src={Genius} alt="Logo" />
                    </div>
                    <button className="back-btn" onClick={toggleSidebar}>
                        <FaChevronLeft />
                    </button>
                </div>

                {/* Main body (flex: 1) to fill the remaining vertical space */}
                <div className="sidebar-body">
                    {/* Top section with Noro AI Chat */}
                    <div className="top-section">
                        <div className="chat-title">
                            <img src={Genius} alt="Chat Icon" />
                            {isExpanded && <span>Noro AI Chat</span>}
                        </div>
                    </div>

                    {/* Bottom section with New Chat */}
                    <div className="bottom-section">
                        <div className="new-chat-btn" onClick={handleNewChat}>
                            {isExpanded && <span>New Chat</span>}
                            <FaPlus />
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex justify-center">
                <div className="delete-share-buttons">
                    <RiDeleteBinLine />
                    <IoShareSocialOutline />
                </div>
                <div className='main-content'>
                    {!isChatActive ? (
                        <div>
                            <div className="main-container">
                                <div className='separate'>
                                    <div className="chat-header">
                                        <h2>How can I help you <br /> today?</h2>
                                        <p>This code will display a prompt asking the <br /> user for their name.</p>
                                    </div>

                                    <div className="buttons-container">
                                        <button className="button-create">
                                            <img src={create} className='Create' alt="Create AI Agent" />
                                            <h6 className='create'>Create an <br /> AI Agent</h6>
                                        </button>
                                        <button className="button-generate">
                                            <img className='Generate' src={generate} alt="Generate Profile Picture" />
                                            <h6 className='generate'>Generate <br /> Profile Picture</h6>
                                        </button>
                                    </div>
                                </div>
                                <div className="sidebar-image">
                                    <img src={ROBOT} alt="Robot" />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="chat-history" ref={chatHistoryRef}>
                            {messages.map((msg) => (
                                <div key={msg.id} className={`message-container ${msg.sender}`}>
                                    {msg.sender === 'bot' && (
                                        <div className="avatar bot-avatar">
                                            <img src={ROBOT} alt="Bot Avatar" />
                                        </div>
                                    )}
                                    <div className={`message-bubble ${msg.sender}`}>
                                        {msg.text}
                                        <div className="message-actions">
                                            <button onClick={() => handleCopyMessage(msg.text)}>
                                                <FaCopy />
                                            </button>
                                            {msg.sender === 'user' && (
                                                <button onClick={() => handleEditMessage(msg.id)}>
                                                    <FaEdit />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="message-input-container">
                        <div className="input-wrapper">
                            <div className="input-inner-wrapper">
                                <img src={logo} alt="logo" className="logo" />
                                <input
                                    className="message-input"
                                    value={message}
                                    onChange={handleMessageChange}
                                    placeholder="Write your message here..."
                                />
                                <div className="buttons-container-input">
                                    <button className="send-button-voice" onClick={handleSendMessage}>
                                        <img src={voice} alt="voice" />
                                    </button>
                                    <button className="send-button-upload" onClick={handleSendMessage}>
                                        <img src={upload} alt="upload" />
                                    </button>
                                    <div className="send">
                                        <button className="send-button" onClick={handleSendMessage}>
                                            <img src={sendlogo} alt="send" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;