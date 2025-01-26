'use client'
import React, {Fragment, useRef} from "react";
import {useLocale, useTranslations} from "next-intl";
import {LocaleValues} from "@/i18n"
import {FloatMenuItem} from "@/app/componments/float-menu";
import {ModelDialogEventHandler} from "@/app/componments/model-dialog";
import {changeLocale} from "@/app/server-actions/modify-locale";
import styles from "./lang.module.scss"
import Image from "next/image"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

interface LanguageButtonProps {
    className?: string;
}

const MenuItems = Object.entries<string>(LocaleValues.localesDisplayName).map(([k, v])=> {
    return {id:k, name:v}
})

//     [
//     {
//         id: "zh",
//         name: LocaleValues.localesDisplayName.zh
//     }
//     ,
//     {
//         id: "en",
//         name:
//         LocaleValues.localesDisplayName.en
//     },
//     {
//         id: "te",
//         name:
//         LocaleValues.localesDisplayName.te
//     }
// ]

const LanguageButton: React.FC<LanguageButtonProps> = (props) => {
    const t = useTranslations("MainPage");
    let locale = useLocale();

    async function onLocaleChanged(item: FloatMenuItem) {
        const legalLocale = LocaleValues.locales.find((l) => item.id === l)
        if (dialogRef.current) {
            dialogRef.current.hide()
        }

        const result = await changeLocale(legalLocale || LocaleValues.defaultLocale);
        //TODO: handle i18n switch error
    }

    const dialogRef = useRef<ModelDialogEventHandler>(null)

    return <Fragment>
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <Image className={styles.language_btn} src={"/language.png"} width={25} height={25} alt="translate"/>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content className={styles.Content} sideOffset={5}>
                    {
                        MenuItems.map((item)=>{
                            return <DropdownMenu.Item className={styles.Item}  onClick={async ()=> await onLocaleChanged(item)} key={item.id}>
                                <img src={`/${item.id}.png`} className={styles.flag_image}/><span>{item.name}</span>
                            </DropdownMenu.Item>
                        })
                    }
                    <DropdownMenu.Arrow style={{fill: "white"}}/>
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    </Fragment>
    // return <div className={`${styles.language_button} ${props.className || ''}`}>
    //     <Image src={"/language.png"} width={25} height={25} alt="translate"/>
    //     <div className={styles.language_text}
    //          onClick={onShowSelectMenu}>
    //         {locale}
    //     </div>
    //
    //     <ModelDialog ref={dialogRef} position={"custom"} >
    //         <FloatMenu className={styles.float_menu} items={[
    //             {
    //                 id: "zh",
    //                 name: LocaleValues.localesDisplayName.zh
    //             }, {
    //                 id: "en",
    //                 name: LocaleValues.localesDisplayName.en
    //             }
    //         ]} onSelect={onLocaleChanged}/>
    //     </ModelDialog>
    // </div>
}

export default LanguageButton