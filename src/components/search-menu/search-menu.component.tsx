import './search-menu.css';

import { SearchOutlined } from '@ant-design/icons';
import { Space, Modal, Select } from 'antd';
import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { formatMenu, SearchMenuProps } from './search-menu.interface';
import { useLocation, useNavigate } from 'react-router-dom';
import { OptionProps, RefSelectProps } from 'antd/lib/select';

const SearchMenuComponent: React.FC<SearchMenuProps> = (props) => {
  const { children, pageMenu, isKeyDownOpen, iconList } = props;
  const [open, setOpen] = useState<boolean>(false);
  const location = useLocation();


  const keyDownOpen = (ev: KeyboardEvent) => {
    if (ev.ctrlKey && ev.key === 'k' && isKeyDownOpen) {
      ev.preventDefault();
      setOpen(true);
    }
  };

  // 解决模态框焦点在select上时，Esc键无法关闭的问题。
  const keyDownEsc = (ev: React.KeyboardEvent<HTMLDivElement>) => {
    if (ev.key === 'Escape') {
      ev.preventDefault();
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', keyDownOpen);
    return () => document.removeEventListener('keydown', keyDownOpen);
  }, []);

  const RenderSearchMenu: React.FC = () => {
    const navigate = useNavigate();
    const [menuList, setMenuList] = useState<Partial<OptionProps>[]>();
    const [selectOpen, setSelectOpen] = useState<boolean>(false);
    const selectRef = useRef<RefSelectProps>(null);

    const svgDefaultProps: React.SVGProps<SVGSVGElement> = { width: '20', height: '20', viewBox: '0 0 15 15' };

    const EnterSvg: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
      <svg aria-label="Enter key" role="img" {...svgDefaultProps} {...props}>
        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2">
          <path d="M12 3.53088v3c0 1-1 2-2 2H4M7 11.53088l-3-3 3-3"></path>
        </g>
      </svg>
    );

    const UpSvg: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
      <svg aria-label="Arrow up" role="img" {...svgDefaultProps} {...props}>
        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2">
          <path d="M7.5 11.5v-8M10.5 6.5l-3-3-3 3"></path>
        </g>
      </svg>
    );

    const DownSvg: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
      <svg aria-label="Arrow down" role="img" {...svgDefaultProps} {...props}>
        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2">
          <path d="M7.5 3.5v8M10.5 8.5l-3 3-3-3"></path>
        </g>
      </svg>
    );

    const EscSvg: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
      <svg aria-label="Escape key" role="img" {...svgDefaultProps} {...props}>
        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2">
          <path d="M13.6167 8.936c-.1065.3583-.6883.962-1.4875.962-.7993 0-1.653-.9165-1.653-2.1258v-.5678c0-1.2548.7896-2.1016 1.653-2.1016.8634 0 1.3601.4778 1.4875 1.0724M9 6c-.1352-.4735-.7506-.9219-1.46-.8972-.7092.0246-1.344.57-1.344 1.2166s.4198.8812 1.3445.9805C8.465 7.3992 8.968 7.9337 9 8.5c.032.5663-.454 1.398-1.4595 1.398C6.6593 9.898 6 9 5.963 8.4851m-1.4748.5368c-.2635.5941-.8099.876-1.5443.876s-1.7073-.6248-1.7073-2.204v-.4603c0-1.0416.721-2.131 1.7073-2.131.9864 0 1.6425 1.031 1.5443 2.2492h-2.956"></path>
        </g>
      </svg>
    );

    // const MenuIcon: React.FC<IconProps> = (props) => {
    //   const { name, ...rest } = props;
    //   const Icon = iconList?.[name];
    //   return Icon && <Icon {...rest} />;
    // };

    const paths: Partial<OptionProps>[] = [];
    let icon: string;
    const menuToOptions = (menuList: formatMenu[]) => {
      return menuList?.map((menu) => {
        if (menu.title === menu.titles) icon = menu.icon;
        if (menu?.children?.length) {
          menuToOptions(menu?.children);
        } else {
          const titleList = menu.titles?.split('/') ?? [];
          const titlesElem = (
            <Space size={5} split={<span className="text-gray-400">/</span>}>
              {titleList.map((m, i) => {
                return titleList.length - 1 === i ? (
                  <span key={i} className="text-gray-900">
                    {m}
                  </span>
                ) : (
                  <span key={i} className="text-gray-400">
                    {m}
                  </span>
                );
              })}
            </Space>
          );
          paths.push({
            value: menu.paths,
            searchKey: menu.titles,
            label: (
              <div className="flex justify-between">
                <Space>
                  {iconList && <span className="text-primary">{iconList[icon]}</span>}
                  {titlesElem}
                </Space>
                <span className="text-gray-400">
                  <EnterSvg width={15} height={15} />
                </span>
              </div>
            ),
          });
        }
      });
    };

    const selectChange = (val: string) => {
      if (val) {
        setOpen(false);
        location.pathname !== val && navigate(val);
      }
    };

    useEffect(() => {
      if (pageMenu) {
        selectRef.current.focus();
        menuToOptions(pageMenu);
        setMenuList(paths);
      }
    }, [JSON.stringify(pageMenu)]);

    // 解决下拉列表定位卡顿偏移等问题
    useEffect(() => {
      open && setTimeout(() => setSelectOpen(true), 301);
    }, [open]);

    return (
      <div className="flex flex-col items-center mt-12">
        <Space size={10} className="intro-y mb-2 px-12 rounded-sm backdrop-blur-sm">
          <Space size={5}>
            <span className="docsearch-commands-key">
              <EnterSvg />
            </span>
            <span className="text-[0.9em] text-gray-200">立即前往</span>
          </Space>
          <Space size={5}>
            <span className="docsearch-commands-key">
              <UpSvg />
            </span>
            <span className="docsearch-commands-key">
              <DownSvg />
            </span>
            <span className="text-[0.9em] text-gray-200">上下选择</span>
          </Space>
          <Space size={5}>
            <span className="docsearch-commands-key">
              <EscSvg />
            </span>
            <span className="text-[0.9em] text-gray-200">关闭</span>
          </Space>
        </Space>
        <Select
          showSearch
          size="large"
          ref={selectRef}
          open={selectOpen}
          options={menuList}
          onChange={selectChange}
          onKeyDown={keyDownEsc}
          optionFilterProp="searchKey"
          className="rounded-xl"
          style={{ minWidth: '600px' }}
          placeholder="查询页面菜单，快速跳转"
          getPopupContainer={(triggerNode) => triggerNode.parentElement}
          suffixIcon={<SearchOutlined className="text-primary text-xl" />}
        />
      </div>
    );
  };

  return (
    <React.Fragment>
      <div onClick={() => setOpen(true)}>{children} </div>
      <Modal
        open={open}
        style={{ pointerEvents: 'auto' }}
        onCancel={() => setOpen(false)}
        destroyOnClose
        modalRender={RenderSearchMenu}
      />
    </React.Fragment>
  );
};

SearchMenuComponent.defaultProps = {
  isKeyDownOpen: true,
};

export default SearchMenuComponent;
