"use client"

const Modal = ({ onClose, pin, setPin, onSubmit }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-10">
        <button onClick={onClose} className="absolute top-2 right-2 cta_btn text-white rounded-md px-3 py-2">
          Close
        </button>
        <div className="flex flex-col w-full justify-center items-center">
          <input 
            type='text'
            value={pin.board}
            onChange={(e) => setPin({ ...pin, board: e.target.value })}
            placeholder='Board Name'
            required
          />
          <button onClick={onSubmit} className="cta_btn text-white rounded-md px-3 py-2">Create Board</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;