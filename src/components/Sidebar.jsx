import react, { useState } from 'react';// Import useState from react

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false); // Declare a state variable and a function to update it

const viewSidebar = () => setIsOpen(!isOpen) // Function to toggle the sidebar


    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}> 
        <button onClick={viewSidebar}>
        {isOpen ? "close" : "open"}
        </button>
        
        <div>
        <button onClick={() => setSortInOrder("ascendingOrder")}>Sort Z-A</button>
        <button onClick={() => setSortInOrder("descendingOrder")}>Sort A-Z</button>
        </div>

        <div>
            <button onClick={() => setSortInOrder("ascendingOrder")}>Newly Updated</button>
            <button onClick={() => setSortInOrder("ascendingOrder")}>Old Updates</button>
        </div>

        </div>

    )
}
export default Sidebar;// Export the component