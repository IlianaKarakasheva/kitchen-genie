import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function NewRecipe() {
    return (
        <div className='container'>
            <div className='newRecipe row align-items-center justify-content-center mt-5'>
                {/* <h4>post a new recipe</h4> */}

                <div className='image col-6 d-flex'>
                    Pick a photo of your dish:
                    <input type="file" />
                </div>
                <form className='col-6'>

                    <div className='title'>
                        <strong>
                            Label your dish:
                        </strong>
                        <input type="text" className='form-control' placeholder='Dish Title' />
                    </div>
                    <div className='content'>
                        <div className='time'>
                            <strong>
                                How long does it take to cook?
                            </strong>
                            <input type="text" className='form-control' placeholder='Time Needed' />
                        </div>
                        <div className='ingredients'>
                            <strong>
                                Ingredients needed:
                            </strong>
                            <input type="text" className='form-control' placeholder='Ingredients needed' />
                        </div>
                        <div className='instructions'>
                            <strong>
                                Instructions:
                            </strong>
                            <input type="text" className='form-control' placeholder='Instructions' />
                        </div>
                    </div>
                    <button type="submit" class="btn btn-sm btn-secondary me-2 mt-4 mb-3">Cancel</button>
                    <button type="submit" class="btn btn-sm btn-secondary me-2 mt-4 mb-3">Submit Recipe</button>

                </form>
            </div>
        </div>
    )
}
