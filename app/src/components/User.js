import React from 'react';
import '../userList.css';

const User = props => {

    return (
        
            
           
						<tr>
							<td>
								<img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt=""></img>
								<p className="user-link">{props.user.name} {props.user.surname}</p>
								
							</td>
							<td>
								{props.user.answers}
							</td>
							
                            </tr>
        



         
    )
}



export default User;