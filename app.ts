#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk"

console.log("\n")
console.log(chalk.bold("-------------------- To-D0 List Application -----------------------"))
console.log("\n")

let ToDo_list:string [] = [];
let condition = true;

while (condition) {
    let option = await inquirer.prompt([
        {
            name: "options",
            type: "list",
            message: "Select an Option",
            choices: ["ADD", "REMOVE", "UPDATE", "QUIT"]
        }
    ]);

    if (option.options === "ADD") {
        let user_Ans = await inquirer.prompt([
            {
                name: "addMore",
                type: "input",
                message: chalk.green("Write something to add to the Todo list :)"),
                validate: (input) => {
                    if (input.trim() === "") {
                        return chalk.red("Please add something to the Todo list!");
                    }
                    return true;
                }
            }
        ]);

        if (user_Ans.addMore.trim() !== "") {
            ToDo_list.push(user_Ans.addMore.trim());
            console.log(chalk.blue("Current Todo List:"),ToDo_list);
        } else {
            console.log("Please write something to add to the Todo list :(");
        }
    }
    else if (option.options === "REMOVE") {
        if (ToDo_list.length === 0) {
            console.log(chalk.red("The Todo list is empty, nothing to remove."));
            continue;
        }

        let removeItem = await inquirer.prompt([
            {
                name: "userRemove",
                type: "list",
                message: chalk.green("Select item to remove from the Todo list"),
                choices: ToDo_list
            }
        ]);

        let index_of_remove = ToDo_list.indexOf(removeItem.userRemove);

        if (index_of_remove >= 0) {
            ToDo_list.splice(index_of_remove, 1);
            console.log(`You removed: ${chalk.yellow(removeItem.userRemove)}`);
            console.log(chalk.blue("Current Todo List:"), ToDo_list);
        }
    }
    else if (option.options === "UPDATE") {
        if (ToDo_list.length === 0) {
            console.log(chalk.red("The Todo list is empty, nothing to update."));
            continue;
        }

        let updateItem = await inquirer.prompt([
            {
                name: "itemToUpdate",
                type: "list",
                message: chalk.green("Select an item to update"),
                choices: ToDo_list
            }
        ]);

        let newTask = await inquirer.prompt([
            {
                name: "newValue",
                type: "input",
                message: `Update the selected task "${chalk.red(updateItem.itemToUpdate)}" to:`,
                validate: (input) => {
                    if (input.trim() === "") {
                        return chalk.red("Please provide a new value for the task!");
                    }
                    return true;
                }
            }
        ]);

        let index_of_update = ToDo_list.indexOf(updateItem.itemToUpdate);

        if (index_of_update >= 0) {
            ToDo_list[index_of_update] = newTask.newValue.trim();
            console.log(`You updated the task to: ${chalk.yellow(newTask.newValue)}`);
            console.log(chalk.blue("Current Todo List:"), ToDo_list);
        }
    }
    else if (option.options === "QUIT") {
        condition = false;
        console.log(chalk.yellow("----------------------------------------"))
        console.log(chalk.blue("Thank you for using the Todo list :)"));
    }
}
