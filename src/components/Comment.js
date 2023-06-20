import React from 'react'

const Comment = ({data}) => {
    const {name, text, replies} = data;
    return(
        <div className="flex shadow-sm p-2 bg-gray-100 rounded-lg my-2">
            <img className="w-8 h-8" alt="user" src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png" />
            <div className="px-3">
                <p className="font-bold">{name}</p>
                <p>{text}</p>
            </div>
        </div>
    )
}

export default Comment;