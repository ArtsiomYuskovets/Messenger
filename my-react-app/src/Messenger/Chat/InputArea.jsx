import "./ChatStyle.css"
export default function InputArea() {
    return (
        <>
            <div style={{display:"flex"}}>
                <input id="inputArea" type="text" placeholder="Text here..." />
                <button id="inputButton"></button>
            </div>
        </>
    );
}