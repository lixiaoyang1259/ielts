import React, {Fragment} from "react";
import styles from "./simulate.module.scss"
import WifiIcon from "./icons/wifi-alt.svg"
import BellIcon from "./icons/bell.svg"
import MenuIcon from "./icons/menu-burger.svg"
import NoteIcon from "./icons/notes.svg"
import LeftIcon from "./icons/left.svg"

const Simulate: React.FC = () => {
    return <div className={styles.main_container}>
        <div className={styles.header_area}>
            <div className={styles.header_info}>
                <div className={styles.user_info}>xxxxx@xxx</div>
                <div className={styles.timer}>xxx remaining</div>
            </div>
            <div className={styles.submit_button}>Finish test</div>
            <WifiIcon className={styles.wifi_icon}></WifiIcon>
            <BellIcon className={styles.bell_icon}></BellIcon>
            <MenuIcon className={styles.menu_icon}></MenuIcon>
            <NoteIcon className={styles.note_icon}></NoteIcon>
        </div>
        <div className={styles.title_area}>
            <div className={styles.part1_literal}>Part 1</div>
            <div className={styles.part1_require}>
                {'You should spend about 20 minutes on this task. Write at least 150 words.'}
            </div>
        </div>
        <div className={styles.question_area}>
            <div className={styles.question}>{
                `The table below shows how the UK unemployed spent their time last year.

Summarise the information by selecting and reporting the main features, and make comparisons where relevant.`
            }</div>
            <div className={styles.diagram}>2222</div>
        </div>
        <div className={styles.answer_area}>
            <textarea spellCheck={false} className={styles.answer}></textarea>
            <div className={styles.counter}>Word Counter: 5</div>
        </div>

        <div className={styles.footer_area}>
            <div className={styles.footer_part1_btn}>
                <span className={styles.footer_part_literal}>
                    Part 1
                </span>
            </div>
            <div className={styles.footer_part2_btn}>
               <span className={styles.footer_part_literal}>
                    Part 2
                </span>
            </div>
            <div className={styles.switch_btn_group}>
                <LeftIcon className={styles.switch_left_btn}></LeftIcon>
                <LeftIcon className={styles.switch_right_btn}></LeftIcon>
            </div>
        </div>
    </div>
}

export default Simulate