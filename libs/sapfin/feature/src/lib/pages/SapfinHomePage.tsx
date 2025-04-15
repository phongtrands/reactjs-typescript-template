import { Button, InputLabel } from '@mui/material';
import { DefaultButton, DefaultDropdown, DefaultGrid, DefaultTextArea } from '@shared/components';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';


const SapfinHomePage = () => {
    return (
        <div className="sapfin-main-layout">
        <div className="sapfin-action-bar py-2 px-4 bg-light d-flex justify-content-between align-items-center">
            <div className="sapfin-source-dropdown d-flex align-items-center gap-2">
                <InputLabel className='sapfin-source-label' >Source</InputLabel>
                <DefaultDropdown />
            </div>
        </div>
        <div className="sapfin-main-content mt-4">
            <div className="">
                <div className="row">
                    <div className="col-7">
                        <p className='sap-response-title'>Preview Folder</p>
                        <div className="row">
                            <div className="col px-0">
                                <DefaultGrid />
                            </div>
                            <div className="col px-0">
                                <DefaultGrid isCheckBox={true}/>
                            </div>
                        </div>
                        <div className='d-flex justify-content-end mt-1'>
                            <DefaultButton value='Reject'/>
                            <DefaultButton value='Download'/>
                        </div>
                    </div>
                    <div className="col-1 d-flex justify-content-center align-items-center">
                        <div>
                            <Button className='mb-1' variant="outlined" color="inherit" startIcon={<ArrowForwardIosIcon />}></Button>
                            <Button className='mt-1' variant="outlined" color="inherit" startIcon={<ArrowBackIosNewIcon />}></Button>
                        </div>
                    </div>
                    <div className="col-4">
                        <p className='sap-response-title'>Upload Folder</p>
                        <DefaultGrid/>
                        <div className='d-flex justify-content-end mt-1'>
                            <DefaultButton value='Test Run'/>
                            <DefaultButton value='Actual Run'/>
                        </div>
                    </div>
                </div>
                <div className='mt-3'>
                    <p className='sap-response-title'>SAP Response</p>
                    <DefaultTextArea />
                </div>
            </div>
        </div>
    </div>
    )
}

export default SapfinHomePage;