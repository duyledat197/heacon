
//bubble chat message
export const PropMessageChat = (props) => {
    return (
        <div className={props.id == myInfo.id ? "prop-message-chat-right" : "prop-message-chat-left"}>
            <img src={findNamebyId(props.id).avatar.imgSmall} className={props.id == myInfo.id ? "display-none" : "friend-message-avatar"} ></img>
            <div className="prop-message-wrap">
                <div className={props.id == myInfo.id ? "display-none" : "prop-message-chat-name"}>{findNamebyId(props.id).name}</div>
                <div className={props.id == myInfo.id ? "prop-message-chat-content-right" : "prop-message-chat-content-left"}> {props.text} </div>
            </div>
        </div>
    )
}