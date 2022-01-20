import React, {useState} from 'react'
import Avatar from "../Avatar"
import { imageShow, videoShow} from "../../utils/mediaShow"
import { useSelector, useDispatch } from 'react-redux'
import { deleteMessages } from "../../redux/actions/messageAction"

const MsgDisplay = ({user, msg, theme, data}) => {
    const { auth } = useSelector(state => state)
    const dispatch = useDispatch()
    const [opacity, setOpacity] = useState("");
    const [display, setDisplay] = useState("")
    
    const handleDeleteMessages = () => {
        if(!data) return;
        
        if(window.confirm('Do you want to delete?')){
            dispatch(deleteMessages({msg, data, auth}))
        }
    }

    const stylees = {
        display: display
    }

    const styles = {
        opacity: opacity
    }

    const showTime = () => {
        setOpacity("1")
        setDisplay("flex")
    }
    
    const hideTime = ( ) => {
        setOpacity("0")
        setDisplay("none")
    }

    return (
        <>
            {
                user._id === auth.user._id &&
                <div className="chat_flex">
                    <div className="chat_time" style={styles}
                        onMouseEnter={showTime} onMouseLeave={hideTime} 
                    >
                        {new Date(msg.createdAt).toLocaleString()}
                        
                    </div>
                    <i className="fas fa-trash success" style={stylees} onMouseEnter={showTime}
                    onMouseLeave={hideTime} 
                        onClick={handleDeleteMessages} />
               </div>
            }
          
          <div className="chat_flex">
                {
                    user._id !== auth.user._id &&
                    <div className="chat_title">
                        <Avatar src={user.avatar} size="small-avatar" />
                    </div>
                }
                <div className="you_content" onMouseEnter={showTime} 
                onMouseLeave={hideTime}>
                    <div>
                        {
                            msg.text && 
                            <div className="chat_text"
                            style={{filter: theme ? 'invert(1)' : 'invert(0)',
                                    color: theme ? "white" : ""}}>
                                {msg.text}
                            </div>
                        }
                        {
                            msg.media.map((item, index) => (
                                <div key={index}>
                                    {
                                        item.url.match(/video/i)
                                        ? videoShow(item.url, theme)
                                        : imageShow(item.url, theme)
                                    }
                                </div>
                            ))
                        }
                    </div>
    
                </div>
            </div>
        {
            user._id !== auth.user._id &&
            <div className="chat_time" style={styles}>
                {new Date(msg.createdAt).toLocaleString()}
            </div>
        }
        </>
    )
}

export default MsgDisplay
