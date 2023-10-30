import React from "react";
import Button from '@mui/material/Button';

function WelcomePage() {
    return(
        <div>
            
            <Button sx={{mt:35, width:300, height:100, fontSize:25}} variant="contained" 
            href="/choose" size="large">
                    Generate pair
            </Button>

        </div>
    )
}

export default WelcomePage;