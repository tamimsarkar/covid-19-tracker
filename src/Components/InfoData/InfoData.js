import { Card, CardContent, Typography } from '@material-ui/core';
import React from 'react';

const InfoData = ({title,total,cases}) => {
    return (
      
           <Card>
               <CardContent>
                   <Typography color="textSecondary" >
                       {title}
                   </Typography>
                  
                       <h3>Today {cases}</h3>
            
                   <Typography color="textSecondary" >
                    {total} Total
                   </Typography>
               </CardContent>
           </Card>
      
    );
};

export default InfoData;