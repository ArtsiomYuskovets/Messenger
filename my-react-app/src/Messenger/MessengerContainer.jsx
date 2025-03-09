import ChatContainer from './Chat/ChatContainer'
import UserAreaContainer from './UserArea/UserAreaContainer';
import SiderAreaContainer from './Sider/SiderAreaContainer';
import "./MessengerStyle.css"

export default function MessengerContainer() {
    return (
        
        <div className="messengerContainer">
            <SiderAreaContainer />
            <UserAreaContainer />
            <ChatContainer />
        </div>
    );
}