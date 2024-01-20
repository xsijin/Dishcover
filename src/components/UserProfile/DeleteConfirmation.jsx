

export default function DeleteConfirmation() {

    const handleDeleteUser = () => {
        
    }

    return (
        <>
            <div className="modal-box">
                <h3 className="font-bold text-lg">Are you sure you want to delete this account?</h3>
                <p className="py-4">You cannot undo this action.</p>
                <div className="modal-action">
                    <button className="btn" onClick={() => handleDeleteUser}>Yes</button>
                    <form method="dialog">
                        <button className="btn">No</button>
                    </form>
                </div>
            </div>
        </>
    )
}