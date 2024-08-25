import React from "react";
import { observer } from "mobx-react-lite";
import {
  Navbar,
  Alignment,
  AnchorButton,
  NavbarDivider,
  EditableText,
  Popover,
} from "@blueprintjs/core";

import FaFacebook from "@meronex/icons/fa/FaFacebook";
import FaWhatsApp from "@meronex/icons/fa/FaWhatsapp";
import FaInstagram from "@meronex/icons/fa/FaInstagram";
import BiCodeBlock from "@meronex/icons/bi/BiCodeBlock";
import MdcCloudAlert from "@meronex/icons/mdc/MdcCloudAlert";
import MdcCloudCheck from "@meronex/icons/mdc/MdcCloudCheck";
import MdcCloudSync from "@meronex/icons/mdc/MdcCloudSync";
import styled from "polotno/utils/styled";

import { useProject } from "../project";

import { FileMenu } from "./file-menu";
import { DownloadButton } from "./download-button";
import { UserMenu } from "./user-menu";
import { CloudWarning } from "../cloud-warning";

const NavbarContainer = styled("div")`
  white-space: nowrap;

  @media screen and (max-width: 500px) {
    overflow-x: auto;
    overflow-y: hidden;
    max-width: 100vw;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: space-around;
    align-items: baseline;
    flex: 1 0 0%;
  }
`;

const NavInner = styled("div")`
  @media screen and (max-width: 500px) {
    display: flex;
  }
`;

const Status = observer(({ project }) => {
  const Icon = !project.cloudEnabled
    ? MdcCloudAlert
    : project.status === "saved"
    ? MdcCloudCheck
    : MdcCloudSync;
  return (
    <Popover
      content={
        <div style={{ padding: "10px", maxWidth: "300px" }}>
          {!project.cloudEnabled && (
            <CloudWarning style={{ padding: "10px" }} />
          )}
          {project.cloudEnabled && project.status === "saved" && (
            <>
              You data is saved with{" "}
              <a href="https://puter.com" target="_blank">
                Puter.com
              </a>
            </>
          )}
          {project.cloudEnabled &&
            (project.status === "saving" || project.status === "has-changes") &&
            "Saving..."}
        </div>
      }
      interactionKind="hover"
    >
      <div style={{ padding: "0 5px" }}>
        <Icon className="bp5-icon" style={{ fontSize: "25px" }} />
      </div>
    </Popover>
  );
});

export default observer(({ store }) => {
  const project = useProject();

  return (
    <NavbarContainer className="bp5-navbar">
      <NavInner>
        <Navbar.Group align={Alignment.LEFT}>
          <img class="logo" src="logo.png" alt="Ink-Tech" />
          <NavbarDivider />
          <FileMenu store={store} project={project} />
          <div
            style={{
              paddingLeft: "20px",
              maxWidth: "200px",
            }}
          >
            <EditableText
              value={window.project.name}
              placeholder="Design name"
              onChange={(name) => {
                window.project.name = name;
                window.project.requestSave();
              }}
            />
          </div>
        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT}>
          <Status project={project} />

          <AnchorButton
            href="https://studio.inktechprinting.services"
            target="_blank"
            minimal
            icon={
              <BiCodeBlock className="bp5-icon" style={{ fontSize: "20px" }} />
            }
          >
            Home
          </AnchorButton>

          <AnchorButton
            minimal
            href="https://wa.me/message/GCP2PFWMFJPYL1"
            target="_blank"
            icon={
              <FaWhatsApp className="bp5-icon" style={{ fontSize: "20px" }} />
            }
          >
            Need Help?
          </AnchorButton>
          <AnchorButton
            minimal
            href="https://www.facebook.com/inktechps?mibextid=LQQJ4d"
            target="_blank"
            icon={
              <FaFacebook className="bp5-icon" style={{ fontSize: "20px" }} />
            }
          ></AnchorButton>
          <AnchorButton
            minimal
            href="https://instagram.com/inktech.ps"
            target="_blank"
            icon={
              <FaInstagram className="bp5-icon" style={{ fontSize: "20px" }} />
            }
          ></AnchorButton>
          <NavbarDivider />
          <DownloadButton store={store} />
          <UserMenu store={store} project={project} />
          {/* <NavbarHeading>Polotno Studio</NavbarHeading> */}
        </Navbar.Group>
      </NavInner>
    </NavbarContainer>
  );
});
