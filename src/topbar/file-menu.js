import React from "react";
import { observer } from "mobx-react-lite";
import {
  Button,
  Dialog,
  Classes,
  Position,
  Menu,
  MenuItem,
  MenuDivider,
  Popover,
} from "@blueprintjs/core";
import { downloadFile } from "polotno/utils/download";

export const FileMenu = observer(({ store, project }) => {
  const inputRef = React.useRef();

  const [faqOpened, toggleFaq] = React.useState(false);
  return (
    <>
      <Popover
        content={
          <Menu>
            {/* <MenuDivider title={t('toolbar.layering')} /> */}
            <MenuItem
              icon="plus"
              text="Create new design"
              onClick={() => {
                project.createNewDesign();
              }}
            />
            <MenuDivider />
            <MenuItem
              // icon={<FaFileImport />}
              icon="folder-open"
              text="Open"
              onClick={() => {
                document.querySelector("#load-project").click();
              }}
            />
            <MenuItem
              // icon={<FaFileExport />}
              icon="floppy-disk"
              text="Save as JSON"
              onClick={() => {
                const json = store.toJSON();

                const url =
                  "data:text/json;base64," +
                  window.btoa(
                    unescape(encodeURIComponent(JSON.stringify(json)))
                  );

                downloadFile(url, "Untitled Design.json");
              }}
            />

            <MenuDivider />
            <MenuItem text="Language" icon="translate">
              <MenuItem
                text="English"
                active={project.language.startsWith("en")}
                onClick={() => {
                  project.setLanguage("en");
                }}
              />
              <MenuItem
                text="Portuguese"
                active={project.language.startsWith("pt")}
                onClick={() => {
                  project.setLanguage("pt");
                }}
              />
              <MenuItem
                text="French"
                active={project.language.startsWith("fr")}
                onClick={() => {
                  project.setLanguage("fr");
                }}
              />
              <MenuItem
                text="Russian"
                active={project.language.startsWith("ru")}
                onClick={() => {
                  project.setLanguage("ru");
                }}
              />
              <MenuItem
                text="Indonesian"
                active={project.language.startsWith("id")}
                onClick={() => {
                  project.setLanguage("id");
                }}
              />
            </MenuItem>
            <MenuItem
              text="About"
              icon="info-sign"
              onClick={() => {
                toggleFaq(true);
              }}
            />
          </Menu>
        }
        position={Position.BOTTOM_RIGHT}
      >
        <Button minimal text="File" />
      </Popover>
      <input
        type="file"
        id="load-project"
        accept=".json,.polotno"
        ref={inputRef}
        style={{ width: "180px", display: "none" }}
        onChange={(e) => {
          var input = e.target;

          if (!input.files.length) {
            return;
          }

          var reader = new FileReader();
          reader.onloadend = async function () {
            var text = reader.result;
            console.log(JSON.parse(text));
            let json;
            try {
              json = JSON.parse(text);
            } catch (e) {
              alert("Can not load the project.");
            }

            if (json) {
              await project.createNewDesign();
              store.loadJSON(json);
              project.save();
              input.value = "";
            }
          };
          reader.onerror = function () {
            alert("Can not load the project.");
          };
          reader.readAsText(input.files[0]);
        }}
      />
      <Dialog
        icon="info-sign"
        onClose={() => toggleFaq(false)}
        title="About Ink-Tech Studio"
        isOpen={faqOpened}
        style={{
          width: "80%",
          maxWidth: "700px",
        }}
      >
        <div className={Classes.DIALOG_BODY}>
          <h2>Ink-Tech Studio: A Brief Overview</h2>
          <p>
            <strong>Ink-Tech Studio</strong> - is a web application to create
            graphical designs. You can mix image, text and illustrations to make
            social media posts, youtube previews, podcast covers, business cards
            and presentations.
          </p>

          <p>
            Partially. The source code is available in{" "}
            <a href="https://github.com/jona-e/Ink-Tech-Studio" target="_blank">
              GitHub repository
            </a>
            . The repository doesn't have full source.{" "}
            <strong>Ink-Tech Studio</strong> is powered by{" "}
            <a href="https://polotno.com/" target="_blank">
              Polotno SDK project
            </a>
            . All core "canvas editor" functionality are implemented by{" "}
            <strong>polotno</strong> npm package (which is not open source at
            the time of writing this text).
          </p>
          <p>
            Ink-Tech Studio is build on top of Polotno SDK to provide a
            desktop-app-like experience.
          </p>
          <h2>Who is founder of Polotno SDK?</h2>
          <p>
            Ink-Tech Studio is a dynamic and innovative digital studio dedicated
            to creating cutting-edge applications that cater to various business
            needs. The studio focuses on blending creativity with technology to
            provide practical and versatile digital solutions.
          </p>
          <p>
            The development of Ink-Tech Studio's latest app was led by the
            Ink-Tech Printing Services company owner, named Jona, a talented
            developer known for her technical expertise and innovative approach
            to problem-solving. However, the original concept and creation of
            the app were spearheaded by Anton Lavrenov, a solo developer, the
            creative mind behind Ink-Tech Studio. He is passionate about
            technology and strives to develop designer tools that can be widely
            used and that can make a difference in the lives of users and
            businesses alike.
          </p>
          <p>
            To encourage the widespread adoption and use of the app, Anton
            Lavrenov has generously allowed others to use the app freely, for
            various purposes, including business applications in diverse fields.
            By doing so, Anton aims to increase the app's visibility and
            recognition, showcasing Ink-Tech Studio's commitment to delivering
            valuable and versatile designer tools to a broad audience.
          </p>
        </div>
        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button onClick={() => toggleFaq(false)}>Close</Button>
          </div>
        </div>
      </Dialog>
    </>
  );
});
