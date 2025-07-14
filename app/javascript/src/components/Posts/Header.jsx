import React, { useEffect, useRef, useState } from "react";

import { Check, ExternalLink } from "@bigbinary/neeto-icons";
import { Button, ActionDropdown } from "@bigbinary/neetoui";
import { Link, useParams, useHistory } from "react-router-dom";

import { useDeletePost } from "../../hooks/reactQuery/postsApi";
import { PageTitle } from "../commons";

const Header = ({
  type,
  status,
  setStatus,
  updatedTime = "",
  handleSubmit,
  loading,
  showStatus,
}) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const menuRef = useRef();
  const { slug } = useParams();
  const history = useHistory();
  const {
    Menu,
    MenuItem: { Button: MenuButton },
  } = ActionDropdown;
  const { mutate: deletePost } = useDeletePost();

  const deleteHandler = () => {
    deletePost(slug);
    history.push("/");
  };

  useEffect(() => {
    const handleClickOutside = event => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return (
    <div className="flex items-end justify-between">
      <PageTitle
        title={type === "create" ? "New blog post" : "Edit blog post"}
      />
      <div className="flex items-center gap-3 text-xs">
        {type === "edit" && (
          <span>
            {showStatus === "Draft" ? "Draft saved at " : "Published on "}
            {updatedTime &&
              new Date(updatedTime).toLocaleString("en-US", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
          </span>
        )}
        <ExternalLink
          className="cursor-pointer"
          onClick={() => history.push(`/posts/${slug}/show`)}
        />
        <Link to="/">
          <Button className="bg-gray-200" label="Cancel" style="Secondary" />
        </Link>
        <ActionDropdown
          className="neetix-actiondropdown"
          disabled={loading}
          label={status === "Draft" ? "Save as draft" : "Publish"}
          buttonProps={{
            className: "neetix-button--primary",
          }}
          dropdownProps={{
            buttonProps: {
              className: "neetix-button--primary",
            },
          }}
          onClick={handleSubmit}
        >
          <Menu>
            <MenuButton onClick={() => setStatus("Draft")}>
              <span className="inline-block w-4 text-left">
                {status === "Draft" && <Check />}
              </span>
              Save as draft
            </MenuButton>
            <MenuButton onClick={() => setStatus("Published")}>
              <span className="inline-block w-4 text-left">
                {status === "Published" && <Check />}
              </span>
              Publish
            </MenuButton>
          </Menu>
        </ActionDropdown>
        {type === "edit" && (
          <div
            className="relative cursor-pointer text-lg"
            ref={menuRef}
            onClick={() => setIsMenuVisible(prev => !prev)}
          >
            ···
            {isMenuVisible && (
              <div className="absolute right-0 z-20 mt-2 w-48 rounded-md border border-gray-300 bg-white py-1 shadow-xl">
                <Link
                  className="block cursor-pointer px-3 py-1.5 text-sm text-red-500 hover:bg-gray-100"
                  onClick={deleteHandler}
                >
                  Delete
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
