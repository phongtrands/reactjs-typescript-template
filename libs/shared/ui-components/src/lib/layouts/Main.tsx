import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Button, InputLabel } from '@mui/material';
import { DefaultTable } from '@shared/components';

const Main = () => {
  return (
    <div className="sapfin-main-layout">
        <div className="sapfin-action-bar py-2 px-4 bg-light d-flex justify-content-between align-items-center">
            <div className="sapfin-source-dropdown d-flex align-items-center gap-2">
                <InputLabel className='sapfin-source-label' >Source</InputLabel>
                {/* <DefaultDropdown /> */}
            </div>
        </div>
        <div className="sapfin-main-content mt-4">
            <div className="">
                <div className="row">
                    <div className="col-7">
                        <p className='sap-response-title'>Preview Folder</p>
                        <div className="row">
                            <div className="col px-0">
                                <DefaultTable />
                            </div>
                            <div className="col px-0">
                                <DefaultTable isCheckBox={true}/>
                            </div>
                        </div>
                        <div className='d-flex justify-content-end mt-1'>
                            <Button className="ms-1" variant="outlined"  color="inherit">Reject</Button>
                            <Button className="ms-1" variant="outlined"  color="inherit">Download</Button>

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
                        <DefaultTable />
                        <div className='d-flex justify-content-end mt-1'>
                            <Button className="ms-1" variant="outlined"  color="inherit">Test Run</Button>
                            <Button className="ms-1" variant="outlined"  color="inherit">Actual Run</Button>
                        </div>
                    </div>
                </div>
                <div className='mt-3'>
                    {/* <p className='sap-response-title'>SAP Response</p>
                    <DefaultTextArea /> */}
                </div>
            </div>
        </div>
    </div>
  );
};

export default Main;