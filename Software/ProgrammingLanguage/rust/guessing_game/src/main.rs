use rand::Rng;
use std::cmp::Ordering;
use std::io;

fn main() {
    println!("Guess a number!");
    let secret_number = rand::thread_rng().gen_range(1, 101);
    let mut low = 1;
    let mut high = 100;
    loop {
        println!("Please input your guess between {} - {}", low, high);
        let mut guess = String::new();
        io::stdin()
            .read_line(&mut guess)
            .expect("Failed to read line");
        println!("You guessed: {}", guess);
        let guess: u32 = match guess.trim().parse() {
            Ok(num) => {
                if num > high || num < low {
                    continue;
                }
                num
            }
            Err(_) => continue,
        };
        match guess.cmp(&secret_number) {
            Ordering::Less => {
                low = guess + 1;
                println!("Too small!")
            }
            Ordering::Greater => {
                high = guess - 1;
                println!("Too big!")
            }
            Ordering::Equal => {
                println!("You win!");
                break;
            }
        }
    }
}
