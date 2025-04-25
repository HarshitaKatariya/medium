import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt';
import { signinInput, signupInput } from '@hk1508/medium-common';

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>();

userRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    const body = await c.req.json();
    const { success } = signupInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
            message : "Inputs not correct"
        })
    }
    console.log('Signup request body:', body);
    try {
      const user = await prisma.user.create({
        data: {
          email: body.username,
          password: body.password,
          name: body.name
        }  
      });
      console.log('User created:', user);
      const jwt = await sign({ 
        id: user.id 
      }, c.env.JWT_SECRET);
      console.log('JWT token generated:', jwt);
      return c.json({ jwt })
    } catch (e: any) {
      console.error("Prisma Error:", e);
      c.status(403);
      return c.json({ error: e.message });
    }
  
  })
  
  userRouter.post('/signin', async (c) => {

    // console.log('Signin request received');
    const body = await c.req.json();
    const { success } = signinInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
            message : "Inputs not correct"
        })
    }
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    console.log('Signin request body:', body);
    const user = await prisma.user.findUnique({
      where: {
        email: body.username,
        password: body.password
      }
    })
    console.log('User found:', user);
    if (!user) {
      c.status(403);
      return c.json({
        error: "user not found"
      });
    }
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    console.log('JWT token generated:', jwt);
    return c.json({ jwt })
  })
  