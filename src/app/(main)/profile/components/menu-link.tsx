'use client'
import React, {useEffect, useRef, useState} from "react";
import {menuVisibleListener} from "@/app/(main)/profile/components/menu-visible-listener";

const MenuLink: React.FC<{ name: string }> = (props) => {
    const targetRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    function getVisible() {
        if (targetRef.current) {
            const rect = targetRef.current.getBoundingClientRect();
            return rect.top >= 0 && rect.bottom <= window.innerHeight
        }
        return false
    }

    function handleScroll() {
        const newVisible = getVisible()
        if (!visible && newVisible) {
            // menu(props.name, newVisible)
            menuVisibleListener.onVisibleChange(props.name, newVisible);
        }
        setVisible(newVisible)
    }

// function handleScroll() {
//     setVisible((oldValue) => {
//         const newVisible = getVisible()
//         if (!oldValue && newVisible) {
//             menu(props.name, newVisible)
//         }
//         return newVisible
//     })
// }

    useEffect(() => {
        const newVisible = getVisible()
        if (newVisible !== visible) {
            setVisible(newVisible)
        }

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [visible]);

    return <div ref={targetRef}></div>
}

export default MenuLink