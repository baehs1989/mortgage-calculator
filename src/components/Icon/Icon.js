import styles from './Icon.module.css'

const Icon = ({children}) => {
    return ( 
        <div data-testid="component_icon" className={styles.Icon}>
            {children}
        </div>
    );
}
 
export default Icon;