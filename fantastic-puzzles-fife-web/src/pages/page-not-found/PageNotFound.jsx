import styles from "./PageNotFound.module.scss"

// front-end page that will be displayed when a user tries to access a page that we haven't defined
export default function PageNotFound() {
    return <div id={styles["home-page-wrapper"]}>
        <h1 className={styles["title"]}>404 - Page Not Found</h1>
    </div>
}