import css from "../Footer/Footer.module.css"


export default function Footer () {
    return( 
                <footer className={css.footer}>
        <div className={css.content}>
            <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
            <div className={css.wrap}>
            <p>Developer: Dmytro Liashenko</p>
            <p>
                Contact us:
                <a href="mailto:dimka4545452@gmail.com">dimka4545452@gmail.com</a>
            </p>
            </div>
        </div>
        </footer>

    )
}