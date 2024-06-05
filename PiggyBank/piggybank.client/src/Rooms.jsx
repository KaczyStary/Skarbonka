import { useEffect, useState } from 'react';
import './Rooms.css';

function showModal() {
    const modal = document.getElementById("modal");
    modal.showModal();
}

function closeModal() {
    const modal = document.getElementById("modal");
    modal.close();
}
export function Rooms() {
    const [rooms, setRooms] = useState([]); // Initialize with an empty array

    useEffect(() => {
        populateRoomsData();
    }, []);

    async function populateRoomsData() {
        const response = await fetch('rooms');
        const data = await response.json();
        console.log(data); // Log the response
        setRooms(data);
    }

    async function joinRoom(room) {
        const roomUserId = 1;
        const roomUser = {
            Id: 1,
            FirstName: "Marek",
            Surname: "Lesny"
        };
        try {
            const response = await fetch('rooms', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ RoomId: room.id, Room: room, RoomUserId: roomUserId, RoomUser: roomUser }),
            });

            if (response.ok) {
                showModal();
            } else {
                console.error('Failed to join room');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div>
            <h1 id="tableLabel">Available Rooms</h1>
            <table className="table table-striped" aria-labelledby="tableLabel">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {rooms.map(room =>
                        <tr key={room.id}>
                            <td>{room.id}</td>
                            <td>{room.name}</td>
                            <button class="btn btn-outline-secondary" type="button" onClick={() => joinRoom(room)}>Join</button>
                        </tr>
                    )}
                </tbody>
            </table>
            <div id="middle">
                <dialog id="modal">
                    <div class="close-modal">
                    <button class="btn btn-primary rounded-circle p-2 lh-1" type="button" onClick={closeModal}>
                        X
                        <span class="visually-hidden">Dismiss</span>
                        </button>
                    </div>
                    <p>Successfully joined room</p>
                </dialog>
            </div>
        </div>
        
    );
}

export default Rooms;