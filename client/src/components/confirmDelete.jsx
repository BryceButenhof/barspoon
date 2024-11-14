import React from 'react';

const ConfirmDelete = (props) => {
    const { recipeName, showConfirm, onCancel, onDelete } = props;

    if (!showConfirm) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 overflow-auto bg-black/40 backdrop-blur-sm flex fade-in">
            <div className="relative md:bottom-72 border bg-gray-700 border-gray-600 rounded-lg p-8 w-full max-w-sm md:max-w-md m-auto flex-col flex">
                <h1 className="text-3xl font-bold">{recipeName}</h1>
                <p className="mt-2">Are you sure you want to delete this recipe?</p>
                <div className="mt-8">
                    <button className="float-right p-2.5 text-md rounded-lg bg-red-500 text-white w-24" onClick={() => onDelete()}>
                        Delete
                    </button>
                    <button className="float-right mr-2 p-2.5 text-md rounded-lg bg-blue-500 text-white w-24" onClick={() => onCancel()}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDelete;