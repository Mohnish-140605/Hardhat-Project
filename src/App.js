import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import contractABI from './contractABI.json';

const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"; 

function App() {
  const [message, setMessage] = useState("");
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    fetchMessage();
  }, []);

  async function fetchMessage() {
    if (!window.ethereum) return;
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    const tx = await contract.updateMessage(newMessage);
    await tx.wait();
    setMessage(newMessage);
  }

  return (
    <div>
      <h1>Current Message: {message}</h1>
      <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
      <button onClick={fetchMessage}>Update Message</button>
    </div>
  );
}

export default App;
