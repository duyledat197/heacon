import { Link } from 'react-router-dom'
export const PropFriendMessage = (props) => (
    <Link to={{ pathname: "/message/" + props.id }}>
        <div className="friend-massage-square">
            <div className="friend-massage-avatar-info">
                <img src="./static/Atommk.jpg" className="friend-message-avatar" />
                <div className="friend-massage-info">
                    <div className="friend-massage-name"> {props.name}</div>
                    <div className="friend-massage-lastMassage"> {props.lastMessage}</div>
                    <div className="friend-massage-lastTime"> {props.lastTime}</div>
                </div>
            </div>
        </div>
    </Link>
)