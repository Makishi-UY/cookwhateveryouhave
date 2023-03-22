/**
 * API REFERENCE:
 * https://platform.openai.com/docs/api-reference/chat
 */

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { ingredients } = body

    // create the prompt
    let prompt = `Dame una receta si tengo estos ingredientes: ${ingredients.toString()}.`
    console.log(`[Prompt] ${prompt}`)

    // send to openai
    const result = (await $fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content:
              'Eres un cocinero que esta describiendo una receta para una persona amateur. Organizaras el resultado de la siguiente forma: "1- Ingredientes: listado de ingredientes. 2- Instrucciones: listado de instrucciones. 3- Conclusion: una conclusion de la receta."',
          },
          { role: 'user', content: prompt },
        ],
        temperature: 1,
        max_tokens: 818,
        top_p: 1,
        frequency_penalty: 1,
        presence_penalty: 0,
        n: 1,
      }),
    })) as any

    let recipe = result?.choices?.[0]?.message?.content
    if (recipe.substring(0, 2) === '\n\n') {
      recipe = recipe.substring(2)
    }

    // log some stuff
    console.log(`[Prompt] ${prompt}`)
    console.log(`[Tokens] ${result?.usage?.total_tokens} (prompt: ${result?.usage?.prompt_tokens}, completion: ${result?.usage?.completion_tokens})`)

    // return to browser
    return recipe
  } catch (e) {
    console.log(e)
  }

  // return an error
  return ''
})
